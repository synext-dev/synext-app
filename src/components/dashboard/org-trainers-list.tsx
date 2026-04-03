"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Trainer } from "@/types";

const DEPARTEMENTS = ["34", "69", "33", "44", "31", "59"];
const DOMAINES = ["Management", "IA", "Digital", "Marketing"];
const INTERVENTION_TYPES = ["Présentiel", "Distanciel", "Hybride"] as const;
const EXPERTISE_LEVELS = ["Débutant", "Intermédiaire", "Expert"] as const;
const DISPONIBILITES = ["Disponible", "Bientôt disponible"] as const;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

interface OrgTrainersListProps {
  trainers: Trainer[];
}

export function OrgTrainersList({ trainers }: OrgTrainersListProps) {
  const [departement, setDepartement] = useState("");
  const [domaine, setDomaine] = useState("");
  const [interventionType, setInterventionType] = useState("");
  const [expertiseLevel, setExpertiseLevel] = useState("");
  const [disponibilite, setDisponibilite] = useState("");

  const filtered = trainers.filter((t) => {
    if (departement && t.departementNum !== departement) return false;
    if (domaine && t.domain !== domaine) return false;
    if (interventionType && t.interventionType !== interventionType) return false;
    if (expertiseLevel && t.expertiseLevel !== expertiseLevel) return false;
    if (disponibilite === "Disponible" && t.availableFrom !== null) return false;
    if (disponibilite === "Bientôt disponible" && t.availableFrom === null) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Title */}
      <h1 className="font-heading text-3xl font-bold text-synext-navy">
        Missionnez votre{" "}
        <span className="text-synext-blue">futur formateur</span>
      </h1>

      {/* Filter bar */}
      <div className="flex items-center gap-2 rounded-2xl border bg-white px-4 py-3 shadow-sm flex-wrap">
        <Select value={departement || undefined} onValueChange={(v) => setDepartement(v === "tous" ? "" : (v ?? ""))}>
          <SelectTrigger className="border-0 shadow-none focus:ring-0 w-auto gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <SelectValue placeholder="Département" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous les départements</SelectItem>
            {DEPARTEMENTS.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="w-px h-5 bg-border" />

        <Select value={domaine || undefined} onValueChange={(v) => setDomaine(v === "tous" ? "" : (v ?? ""))}>
          <SelectTrigger className="border-0 shadow-none focus:ring-0 w-auto gap-1.5 text-sm text-muted-foreground">
            <span className="text-muted-foreground">🎓</span>
            <SelectValue placeholder="Domaine" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous les domaines</SelectItem>
            {DOMAINES.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="w-px h-5 bg-border" />

        <Select value={interventionType || undefined} onValueChange={(v) => setInterventionType(v === "tous" ? "" : (v ?? ""))}>
          <SelectTrigger className="border-0 shadow-none focus:ring-0 w-auto gap-1.5 text-sm text-muted-foreground">
            <span className="text-muted-foreground">🚗</span>
            <SelectValue placeholder="Type Intervention" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous les types</SelectItem>
            {INTERVENTION_TYPES.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="w-px h-5 bg-border" />

        <Select value={expertiseLevel || undefined} onValueChange={(v) => setExpertiseLevel(v === "tous" ? "" : (v ?? ""))}>
          <SelectTrigger className="border-0 shadow-none focus:ring-0 w-auto gap-1.5 text-sm text-muted-foreground">
            <span className="text-muted-foreground">🛡️</span>
            <SelectValue placeholder="Niveau Expertise" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous les niveaux</SelectItem>
            {EXPERTISE_LEVELS.map((l) => (
              <SelectItem key={l} value={l}>{l}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="w-px h-5 bg-border" />

        <Select value={disponibilite || undefined} onValueChange={(v) => setDisponibilite(v === "tous" ? "" : (v ?? ""))}>
          <SelectTrigger className="border-0 shadow-none focus:ring-0 w-auto gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            <SelectValue placeholder="Disponibilité" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Toutes</SelectItem>
            {DISPONIBILITES.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="ml-auto">
          <Button className="bg-synext-navy text-white hover:bg-synext-navy/90 rounded-full px-6">
            Rechercher
          </Button>
        </div>
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          Aucun formateur trouvé avec ces critères.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      )}
    </div>
  );
}

function TrainerCard({ trainer }: { trainer: Trainer }) {
  const visibleSpecialties = trainer.specialties.slice(0, 2);
  const extraCount = trainer.specialties.length - 2;

  return (
    <div className="rounded-2xl border bg-white overflow-hidden shadow-sm">
      {/* Photo with badges */}
      <div className="relative h-72 w-full">
        <Image
          src={trainer.photo}
          alt={trainer.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Overlaid badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-synext-navy backdrop-blur-sm">
            {trainer.domain}
          </span>
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-synext-navy backdrop-blur-sm">
            {trainer.departementNum}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Name */}
        <h2 className="font-heading text-2xl font-bold text-synext-navy">
          {trainer.name}
        </h2>

        {/* Specialty tags */}
        <div className="flex flex-wrap items-center gap-2">
          {visibleSpecialties.map((s) => (
            <Badge
              key={s}
              variant="secondary"
              className="rounded-full text-xs px-3 py-1"
            >
              {s}
            </Badge>
          ))}
          {extraCount > 0 && (
            <Badge
              variant="secondary"
              className="rounded-full text-xs px-3 py-1"
            >
              +{extraCount}
            </Badge>
          )}
        </div>

        {/* Availability + tarif */}
        <div className="flex flex-wrap items-center gap-2">
          {trainer.availableFrom === null ? (
            <Badge className="rounded-full bg-green-100 text-green-700 hover:bg-green-100 text-xs px-3 py-1 font-medium">
              Disponible
            </Badge>
          ) : (
            <Badge className="rounded-full bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs px-3 py-1 font-medium">
              À partir du {formatDate(trainer.availableFrom)}
            </Badge>
          )}
          <Badge
            variant="secondary"
            className="rounded-full text-xs px-3 py-1"
          >
            Tarif Horaire Min : {trainer.hourlyRate}€
          </Badge>
        </div>

        {/* Type + Expertise */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="rounded-full text-xs px-3 py-1"
          >
            {trainer.interventionType}
          </Badge>
          <Badge
            variant="secondary"
            className="rounded-full text-xs px-3 py-1"
          >
            {trainer.expertiseLevel}
          </Badge>
        </div>

        {/* CTA */}
        <Link href={`/dashboard/organization/trainers/${trainer.id}`} className="block mt-2">
          <Button className="w-full rounded-full bg-synext-navy text-white hover:bg-synext-navy/90">
            Découvrir le profil
          </Button>
        </Link>
      </div>
    </div>
  );
}
