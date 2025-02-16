// await new Promise((resolve) => setTimeout(resolve, 10000));
export function PostContentSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="lg:grid lg:grid-cols-12 gap-24 max-w-6xl mx-auto px-4 lg:px-8">
        <div className="lg:col-span-8">
          <div className="mb-5 lg:hidden" />
          <div className="h-10 mb-4 rounded bg-neutral-300 dark:bg-neutral-500" />
          <div className="h-4 mb-2 rounded bg-neutral-300 dark:bg-neutral-500" />
          <div className="h-4 mb-2 rounded bg-neutral-300 dark:bg-neutral-500" />
          <div className="h-4 mb-2 rounded bg-neutral-300 dark:bg-neutral-500" />
          <div className="h-4 mb-2 rounded bg-neutral-300 dark:bg-neutral-500" />
          <div className="h-4 mb-2 rounded bg-neutral-300 dark:bg-neutral-500" />
          <div className="h-4 mb-2 rounded bg-neutral-300 dark:bg-neutral-500" />
          <div className="w-[75%] h-4 mb-2 rounded bg-neutral-300 dark:bg-neutral-500" />
        </div>
        <aside className="lg:col-span-4 flex flex-col items-center mt-10">
          <div className="w-[50%] h-20 rounded bg-neutral-300 dark:bg-neutral-500" />
          <div className="w-full h-40 rounded bg-neutral-300 dark:bg-neutral-500 mt-2" />
        </aside>
      </div>
    </div>
  );
}

export function PostListSkeleton() {
  return (
    <div className="my-4 flex flex-col gap-y-4 animate-pulse">
      <div className="h-8 rounded-xl bg-neutral-300 dark:bg-neutral-500" />
      <div className="h-8 rounded-xl bg-neutral-300 dark:bg-neutral-500" />
      <div className="h-8 rounded-xl bg-neutral-300 dark:bg-neutral-500" />
    </div>
  );
}

export function TagsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-7">
        <div className="h-5 w-5 rounded-full bg-neutral-300 dark:bg-neutral-500 mb-2" />
        <div className="flex gap-3">
          <div className="h-9 w-28 rounded bg-neutral-300 dark:bg-neutral-500 mb-2" />
          <div className="h-9 w-28 rounded bg-neutral-300 dark:bg-neutral-500 mb-2" />
          <div className="h-9 w-28 rounded bg-neutral-300 dark:bg-neutral-500 mb-2" />
          <div className="h-9 w-28 rounded bg-neutral-300 dark:bg-neutral-500 mb-2" />
        </div>
      </div>
      <div className="mb-7">
        <div className="h-5 w-5 rounded-full bg-neutral-300 dark:bg-neutral-500 mb-2" />
        <div className="flex gap-3">
          <div className="h-9 w-28 rounded bg-neutral-300 dark:bg-neutral-500 mb-2" />
          <div className="h-9 w-28 rounded bg-neutral-300 dark:bg-neutral-500 mb-2" />
          <div className="h-9 w-28 rounded bg-neutral-300 dark:bg-neutral-500 mb-2" />
          <div className="h-9 w-28 rounded bg-neutral-300 dark:bg-neutral-500 mb-2" />
        </div>
      </div>
      <div className="mb-7">
        <div className="h-5 w-5 rounded-full bg-neutral-300 dark:bg-neutral-500 mb-2" />
        <div className="flex gap-3">
          <div className="h-9 w-28 rounded bg-neutral-300 dark:bg-neutral-500 mb-2" />
          <div className="h-9 w-28 rounded bg-neutral-300 dark:bg-neutral-500 mb-2" />
          <div className="h-9 w-28 rounded bg-neutral-300 dark:bg-neutral-500 mb-2" />
          <div className="h-9 w-28 rounded bg-neutral-300 dark:bg-neutral-500 mb-2" />
        </div>
      </div>
      <div className="mb-7">
        <div className="h-5 w-5 rounded-full bg-neutral-300 dark:bg-neutral-500 mb-2" />
        <div className="flex gap-3">
          <div className="h-9 w-28 rounded bg-neutral-300 dark:bg-neutral-500 mb-2" />
          <div className="h-9 w-28 rounded bg-neutral-300 dark:bg-neutral-500 mb-2" />
          <div className="h-9 w-28 rounded bg-neutral-300 dark:bg-neutral-500 mb-2" />
          <div className="h-9 w-28 rounded bg-neutral-300 dark:bg-neutral-500 mb-2" />
        </div>
      </div>
    </div>
  );
}

export function TagSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="h-8 w-[30%] rounded-xl bg-neutral-300 dark:bg-neutral-500" />
        <div className="my-3 h-8 w-[10%] rounded-xl bg-neutral-300 dark:bg-neutral-500" />
        <div className="h-8 w-[20%] rounded-xl bg-neutral-300 dark:bg-neutral-500" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 sm:grid sm:grid-cols-5 mt-10">
        <div className="my-4 flex flex-col gap-y-4 sm:col-span-3">
          <div className="h-8 rounded-xl bg-neutral-300 dark:bg-neutral-500" />
          <div className="h-8 rounded-xl bg-neutral-300 dark:bg-neutral-500" />
          <div className="h-8 rounded-xl bg-neutral-300 dark:bg-neutral-500" />
        </div>
        <div className="sm:col-span-2" />
      </div>
    </div>
  );
}
