import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSound } from '@/hooks/useSound';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const SoundToggle = () => {
  const { isMuted, toggleMute, playToggle } = useSound();

  const handleToggle = () => {
    toggleMute();
    if (isMuted) {
      // Play tick right after unmuting
      setTimeout(() => playToggle(), 50);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
          aria-label={isMuted ? 'Unmute UI sounds' : 'Mute UI sounds'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-primary" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-[10px] font-mono">
        {isMuted ? 'Enable UI Audio Feedback' : 'Mute UI Audio Feedback'}
      </TooltipContent>
    </Tooltip>
  );
};
