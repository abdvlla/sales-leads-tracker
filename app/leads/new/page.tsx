import * as React from "react";

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

export default function page() {
  return (
    <Card className="my-8 mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Add sales lead</CardTitle>
        <CardDescription>
          Fill in fields as needed. Click save when you are done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Name</Label>
              <Input id="name" placeholder="Name of customer" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Responsible</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="craig">Craig</SelectItem>
                  <SelectItem value="katie">Katie</SelectItem>
                  <SelectItem value="mark">Mark</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  );
}
