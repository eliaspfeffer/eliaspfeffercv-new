import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, Phone, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Nostr SVG Icon component
const NostrIcon = () => (
  <svg
    className="mr-2 h-4 w-4"
    viewBox="0 0 500 500"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M391.3 377.17c-6.41 4.73-14.39 3.39-19.12-3.02-4.73-6.41-3.39-14.39 3.02-19.12 34.72-25.6 55.18-65.41 55.18-108.36 0-42.95-20.46-82.76-55.18-108.36-6.41-4.73-7.75-12.71-3.02-19.12 4.73-6.41 12.71-7.75 19.12-3.02 41.13 30.33 65.74 77.81 65.74 130.5 0 52.69-24.61 100.17-65.74 130.5zM108.7 377.17c-41.13-30.33-65.74-77.81-65.74-130.5 0-52.69 24.61-100.17 65.74-130.5 6.41-4.73 14.39-3.39 19.12 3.02 4.73 6.41 3.39 14.39-3.02 19.12-34.72 25.6-55.18 65.41-55.18 108.36 0 42.95 20.46 82.76 55.18 108.36 6.41 4.73 7.75 12.71 3.02 19.12-4.73 6.41-12.71 7.75-19.12 3.02z" />
    <path d="M331.12 320.72c-4.73 6.41-12.71 7.75-19.12 3.02-6.41-4.73-7.75-12.71-3.02-19.12 17.36-23.53 17.36-55.04 0-78.57-4.73-6.41-3.39-14.39 3.02-19.12 6.41-4.73 14.39-3.39 19.12 3.02 23.81 32.27 23.81 78.5 0 110.77zM168.88 320.72c-23.81-32.27-23.81-78.5 0-110.77 4.73-6.41 12.71-7.75 19.12-3.02 6.41 4.73 7.75 12.71 3.02 19.12-17.36 23.53-17.36 55.04 0 78.57 4.73 6.41 3.39 14.39-3.02 19.12-6.41 4.73-14.39 3.39-19.12-3.02z" />
    <circle cx="250" cy="246.67" r="35" />
  </svg>
);

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Contact / Hire me</h2>
        <Card>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Get in touch</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Just click on your favorite platform
              </p>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a href="mailto:eliaspfeffer@gmail.com">
                    <Mail className="mr-2 h-4 w-4" />
                    eliaspfeffer@gmail.com
                  </a>
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        asChild
                      >
                        <a href="tel:+4917663895331">
                          <Phone className="mr-2 h-4 w-4" />
                          +49 176 6389 5331
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Mobile / Phone</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a
                    href="https://wa.me/4917663895331"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a
                    href="https://github.com/eliaspfeffer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a
                    href="https://linkedin.com/in/eliaspfeffer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        asChild
                      >
                        <a
                          href="https://primal.net/p/npub13dylj5cryc0854jlaqjlf2yalgl5r9rzwsxekywt63k9y3xfs94qcg3ke8"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src="/nostrlogo.png"
                            alt="Nostr"
                            width={16}
                            height={16}
                            className="mr-2"
                          />
                          @EliasPfeffer
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Nostr / Primal (a decentralized X / twitter alternative)
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        asChild
                      >
                        <a
                          href="https://x.com/elias_pfeffer"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <X className="mr-2 h-4 w-4" />
                          @elias_pfeffer
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>X / Twitter</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Pestalozzistr. 65
                <br />
                72762 Reutlingen
                <br />
                Germany
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
