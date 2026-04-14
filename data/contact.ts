export const bookingLink = "https://calendly.com/fuaadabdullah/30min";

export const bookingCta = {
  label: "Start a project",
  shortLabel: "Book a call",
};

export const contactEmail = "fuaadabdullah@gmail.com";
export const contactEmailHref = `mailto:${contactEmail}`;

export interface Testimonial {
  quote: string;
  client: string;
  context: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Fuaad built our site in a week, clean and fast.",
    client: "Elbey Projects",
    context: "Client website launch",
  },
];
