export default function PlaceholderAvatarIcon() {
  return (
    <div className="relative h-[40px] w-[40px] overflow-hidden rounded-full bg-gray-100 dark:bg-gray-300">
      <svg
        aria-hidden
        className="absolute -bottom-1 h-[40px] w-[40px] text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
}
