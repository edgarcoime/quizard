'use client'

import { API_BASE_URL } from "@/constants";
import { formatDistanceToNow } from "date-fns";
import { Card, CardHeader, CardTitle, CardFooter, CardContent } from "@/components/ui/card";
import { Laptop, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";

type session = {
  device_model: string,
  browser_name: string,
  last_activity: string,
  expires_in: string,
  created_at: string,
  is_current: boolean,
  id: string
}

export const UserSession = () => {
  const [sessions, setSessions] = useState<session[]>([])

  const getSessions = async () => {
    const res = await fetch(`${API_BASE_URL}/auth/sessions`);
    const data: any[] = await res.json()

    if (res.status !== 200) return []
    setSessions(data?.map(d => ({
      device_model: d?.device_model,
      browser_name: d?.browser_name,
      last_activity: formatDistanceToNow(new Date(d?.updated_at.slice(0, 23) + "Z"), { addSuffix: true }),
      created_at: formatDistanceToNow(new Date(d?.created_at.slice(0, 23) + "Z"), { addSuffix: true }),
      expires_in: formatDistanceToNow(new Date(d?.expires_at.slice(0, 23) + "Z"), { addSuffix: true }),
      is_current: d?.is_current,
      id: d?.id
    })) ?? [])
  }

  const delete_session = (session_id: string) => async () => {
    await fetch(`${API_BASE_URL}/auth/sessions/${session_id}`, {
      method: "DELETE",
    } as any);
    await getSessions()
  }

  useEffect(() => {
    getSessions()
  }, [])


  return (
    <div className="flex flex-col gap-2">
      {sessions?.map(sessionData => (
        <Card>
          <CardHeader className="relative">
            <CardTitle className="flex items-center">
              <Laptop className="mr-2" />
              {sessionData.device_model}
            </CardTitle>
            {sessionData.is_current && (
              <Badge variant="secondary" className="absolute top-2 right-2">
                Current
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Browser:</strong> {sessionData.browser_name}</p>
              <p><strong>Last activity:</strong> {sessionData.last_activity}</p>
              <p><strong>Created:</strong> {sessionData.created_at}</p>
              <p><strong>Expiry:</strong> {sessionData.expires_in}</p>
            </div>
          </CardContent>
          {!sessionData.is_current && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <CardFooter>
                  <Button
                    variant="destructive"
                    className="w-full"
                  >
                    Delete session
                  </Button>
                </CardFooter>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete session?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={delete_session(sessionData?.id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </Card>
      ))}
    </div>
  )
}
