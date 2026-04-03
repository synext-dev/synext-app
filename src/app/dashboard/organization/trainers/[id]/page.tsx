import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone, Mail, Bookmark, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTrainerById } from "@/lib/services/trainer.service";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

export default async function OrgTrainerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trainer = await getTrainerById(id);

  if (!trainer) return notFound();

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back button */}
      <Link
        href="/dashboard/organization/trainers"
        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Revenir à ma recherche
      </Link>

      {/* Main content */}
      <div className="grid gap-10 md:grid-cols-2">
        {/* Left column */}
        <div className="space-y-5">
          <h1 className="font-heading text-3xl font-bold text-synext-navy">
            {trainer.name}
          </h1>

          {/* Photo with badges */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-synext-blue aspect-[4/3]">
            <Image
              src={trainer.photo}
              alt={trainer.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-synext-navy backdrop-blur-sm">
                {trainer.domain}
              </span>
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-synext-navy backdrop-blur-sm">
                {trainer.departementNum}
              </span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {trainer.bio}
          </p>

          {/* Rating + tarif */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(trainer.rating)
                      ? "fill-synext-blue text-synext-blue"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-sm">
              Tarif Horaire Min : {trainer.hourlyRate}€
            </Badge>
          </div>

          {/* CTA buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button className="rounded-full bg-synext-navy text-white hover:bg-synext-navy/90 gap-2">
              <Phone className="h-4 w-4" />
              Voir n° de téléphone
            </Button>
            <Button className="rounded-full bg-synext-navy text-white hover:bg-synext-navy/90 gap-2">
              <Mail className="h-4 w-4" />
              Contacter par e-mail
            </Button>
            <Button
              variant="secondary"
              className="rounded-full bg-synext-light text-synext-navy hover:bg-synext-light/80 gap-2"
            >
              <Bookmark className="h-4 w-4" />
              Enregistrer le profil
            </Button>
            <Button
              variant="secondary"
              className="rounded-full bg-synext-light text-synext-navy hover:bg-synext-light/80 gap-2"
            >
              <Star className="h-4 w-4" />
              Noter sur 5 étoiles
            </Button>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-7">
          {/* Disponibilité */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-synext-blue" />
              <h2 className="font-heading text-base font-semibold text-synext-navy">
                Disponibilité
              </h2>
            </div>
            {trainer.availableFrom === null ? (
              <Badge className="rounded-full bg-green-100 text-green-700 hover:bg-green-100 px-4 py-1.5 text-sm font-medium">
                Disponible
              </Badge>
            ) : (
              <Badge className="rounded-full bg-amber-100 text-amber-700 hover:bg-amber-100 px-4 py-1.5 text-sm font-medium">
                À partir du {formatDate(trainer.availableFrom)}
              </Badge>
            )}
          </div>

          {/* Spécialités */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-synext-blue" />
              <h2 className="font-heading text-base font-semibold text-synext-navy">
                Spécialité(s) liée(s) au domaine
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {trainer.specialties.map((s) => (
                <Badge
                  key={s}
                  variant="secondary"
                  className="rounded-full px-4 py-1.5 text-sm"
                >
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          {/* Type d'intervention */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-synext-blue" />
              <h2 className="font-heading text-base font-semibold text-synext-navy">
                Type d&apos;intervention
              </h2>
            </div>
            <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-sm">
              {trainer.interventionType}
            </Badge>
          </div>

          {/* Années d'expérience */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-synext-blue" />
              <h2 className="font-heading text-base font-semibold text-synext-navy">
                Année d&apos;expérience dans la formation
              </h2>
            </div>
            <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-sm">
              {trainer.yearsOfExperience} ans
            </Badge>
          </div>

          {/* Niveau */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-synext-blue" />
              <h2 className="font-heading text-base font-semibold text-synext-navy">
                Niveau du formateur(trice)
              </h2>
            </div>
            <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-sm">
              {trainer.expertiseLevel}(e)
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
