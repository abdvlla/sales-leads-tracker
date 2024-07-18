"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import supabase from "@/utils/supabase";
import { responsibles, statuses } from "../data/data";

const AddLeadPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [responsible, setResponsible] = useState("");
  const [status, setStatus] = useState("");
  const [quote, setQuote] = useState<number | undefined>(undefined);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !responsible || !status || quote === undefined) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      responsible,
      status,
      quote,
      notes,
    });

    setLoading(false);

    if (error) {
      setError("Error adding lead: " + error.message);
    } else {
      router.push("/leads");
    }
  };

  return (
    <Card className="my-8 mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Add sales lead</CardTitle>
        <CardDescription>
          Fill in fields as needed. Click save when you are done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name of customer"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email of customer"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-row space-x-4">
              <div className="flex-grow justify-start">
                <Label htmlFor="responsible">Responsible</Label>
                <Select onValueChange={setResponsible} value={responsible}>
                  <SelectTrigger id="responsible">
                    <SelectValue placeholder="Select salesperson" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {responsibles.map((responsibleOption) => (
                      <SelectItem
                        key={responsibleOption.value}
                        value={responsibleOption.value}
                      >
                        {responsibleOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-grow justify-end">
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={setStatus} value={status}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select current status" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {statuses.map((statusOption) => (
                      <SelectItem
                        key={statusOption.value}
                        value={statusOption.value}
                      >
                        <statusOption.icon className="mr-2 h-4 w-4 inline-block" />
                        {statusOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="quote">Quote amount</Label>
              <Input
                min={0}
                step={10}
                type="number"
                id="quote"
                placeholder="Amount quoted"
                value={quote ?? ""}
                onChange={(e) => setQuote(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Information about the lead and/or customer"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.push("/leads")}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddLeadPage;
