
import { Button } from "@/components/ui/button";
import { UserRoomCard } from "@/app/your-rooms/user-room-card";
import { getUserRooms } from "@/data-access/rooms";
import Link from "next/link";
import { unstable_noStore } from "next/cache";


export default async function YourRoomPage() {
    unstable_noStore();
  const rooms = await getUserRooms();

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Your Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="grid grid-col-3 gap-4">
      {rooms.map((room) => {
        return <UserRoomCard key={room.id} room={room} />
      })}
      </div>
    </main>
  );
}
