"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { responsibles, statuses } from "../data/data";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import supabase from "@/utils/supabase";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Customer } from "@/app/lib/definitions";
import { revalidateLead } from "@/app/action";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, {
      message: "Name must be at least 3 characters.",
    }),
  email: z.string().email({ message: "Invalid email address" }),
  responsible: z.string(),
  status: z.string(),
  quote: z.coerce.number().optional(),
  notes: z.string().optional().nullish(),
});

type FormValues = z.infer<typeof formSchema>;

type CustomerFormProps = {
  customer?: Customer;
};

export default function LeadForm({ customer }: CustomerFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<FormValues>({
    defaultValues: customer
      ? {
          name: customer.name,
          email: customer.email,
          responsible: customer.responsible,
          status: customer.status,
          quote: customer.quote,
          notes: customer.notes,
        }
      : undefined,
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: FormValues) {
    if (customer) {
      try {
        await supabase.from("leads").update(values).eq("id", customer.id);
        revalidateLead(customer.id);
        router.push("/leads");
        toast({
          title: "Success!",
          description: "Lead successfully updated.",
        });
      } catch (error) {
        console.error("Error updating lead:", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } else {
      try {
        await supabase.from("leads").insert(values);
        console.log("Lead created successfully", values);
        router.push("/leads");
        toast({
          title: "Success!",
          description: "Lead successfully created.",
        });
      } catch (error) {
        console.error("Error creating lead:", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    }
  }

  return (
    <Card className="my-8 mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Add sales lead</CardTitle>
        <CardDescription>
          Fill in fields as needed. Click save when you are done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row space-x-4">
              <div className="flex-grow">
                <FormField
                  control={form.control}
                  name="responsible"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Responsible</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value || ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select salesperson" />
                          </SelectTrigger>
                          <SelectContent>
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-grow">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value || ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select current status" />
                          </SelectTrigger>
                          <SelectContent>
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quote amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Amount quoted"
                      min={0}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Information about the lead and/or customer"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between mt-4">
              <Button asChild variant="outline">
                <Link href={"/leads"}> Cancel </Link>
              </Button>
              <Button type="submit" className="">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
