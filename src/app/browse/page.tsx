import { TagList } from "@/components/tags-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getRooms } from "@/data-access/rooms";
import { db } from "@/db";
import { Room } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "./search-bar";
import { splitTags } from "@/lib/utils";
import { unstable_noStore } from "next/cache";
import Image from "next/image";


function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>
          {room.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagList tags={splitTags(room.tags)} />
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

export default async function Home({ searchParams, }: { searchParams : { search: string; }; }) {
  unstable_noStore();

  const rooms = await getRooms(searchParams.search);

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="mb-12">
        <SearchBar />
      </div>
      <div className="grid grid-col-3 gap-4">
      {rooms.map((room) => {
        return <RoomCard key={room.id} room={room} />
      })}
      </div>
      {rooms.length === 0 && (
        <div className="flex flex-col gap-4 justify-center items-center mt-24">
          <Image
            src="/notfound.svg"
            width="200"
            height="200"
            alt="no data image"
          />

          <h2 className="text-2xl">No Rooms Yet!</h2>

          <Button asChild>
            <Link href="/create-room">Create Room</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
