// Removed dynamic robots route in favor of static public/robots.txt
// Exporting no-op to avoid accidental dynamic robots generation.
export default function robots(){
  return null as any;
}
