"use client";
import Fullscreen from "./Fullscreen";
import NotificationBell from "./NotificationBell";

import ProfileMenu from "./ProfileMenu";

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white py-3 shadow-sm z-20">
      <div className="w-[95%] mx-auto flex items-center justify-between">

        <div className="flex items-center gap-6">
          <Fullscreen />
          <NotificationBell count={5} />
        </div>
        <div className="flex items-center gap-5">
          <ProfileMenu
            name="قالین فروشی رضوانی"
            avatar="/images/logo/carpet-logo.jpg"
          />
        </div>
      </div>

    </header>
  );
}
