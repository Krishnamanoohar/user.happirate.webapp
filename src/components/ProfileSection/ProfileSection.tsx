import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface ProfileSectionProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

const ProfileSection = ({ icon: Icon, title, children }: ProfileSectionProps) => {
  return (
    <div className="animate-slide-up">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="h-11 w-11 rounded-lg bg-violet-100 flex items-center justify-center">
          <Icon className="h-6 w-6 text-violet-500" />
        </div>
        <h3 className="text-md font-semibold text-foreground uppercase tracking-wide">{title}</h3>
      </div>
      <div className="bg-card rounded-xl card-shadow divide-y divide-border/50">
        {children}
      </div>
    </div>
  );
};

export default ProfileSection;
