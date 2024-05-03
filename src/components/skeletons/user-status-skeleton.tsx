export default function UserStatusSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-4">
      <div className="h-[40px] w-[40px] rounded-full bg-gray-300"></div>
      <div className="flex gap-2">
        <div className="h-2.5 w-36 rounded-full bg-gray-300"></div>
        <div className="h-2.5 w-16 rounded-full bg-gray-400"></div>
      </div>
    </div>
  );
}
