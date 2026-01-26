import React from "react";

const NotFoundPage = () => {
  return (
    <div class="flex min-h-[87vh] flex-col items-center justify-center space-y-6 dark-background">
      <div class="space-y-2 text-center">
        <h1 class="text-h2 font-bold">404: Page Not Found</h1>{" "}
        <p class="text-[#8f8f8f]">That page does not exist on this website.</p>
      </div>{" "}
      <div class="w-80 space-y-4">
        <button
          class="h-[3.25rem] px-6 py-3 text-h3 ring-offset-background border rounded-2xl focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-1.5 cursor-pointer w-full text-primary-foreground bg-primary/80 hover:bg-primary/90"
          type="button"
          onClick={()=>window.location.href="/"}
        >
          Go to homepage
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
