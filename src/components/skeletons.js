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
          <div className="h-20 w-20 rounded-full bg-neutral-300 dark:bg-neutral-500" />
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

export function SkeletonTagsAndCategories() {
  return (
    <div className="container">
      <div className="grid">
        <div className="article-content">
          <div className="post-header medium width">
            <div>
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-title" />
            </div>
          </div>
          <section className="segment small">
            <div className="post-content">
              <div>
                <div className="skeleton skeleton-text" />
                <div className="skeleton skeleton-text" />
                <div className="skeleton skeleton-text" />
                <div className="skeleton skeleton-text" />
                <div className="skeleton skeleton-text" />
                <div className="skeleton skeleton-text" />
                <div className="skeleton skeleton-text skeleton-text-last" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
