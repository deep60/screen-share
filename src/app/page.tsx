import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getRooms } from "@/data-access/rooms";
import { db } from "@/db";
import { Room } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import Link from "next/link";


function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>
          {room.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {room.githubRepo && (
          <Link href={room.githubRepo} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
            <GithubIcon />
            Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>
          Join Room
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default async function Home() {

  const rooms = await getRooms();

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="grid grid-col-3 gap-4">
      {rooms.map((room) => {
        return <RoomCard key={room.id} room={room} />
      })}
      </div>
    </main>
  );
}
