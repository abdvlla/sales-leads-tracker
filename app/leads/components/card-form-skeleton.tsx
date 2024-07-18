import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const EditLeadSkeleton: React.FC = () => {
  return (
    <Card className="my-8 mx-auto max-w-md">
      <CardHeader>
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-3/4 mt-2" />
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex flex-row space-x-4">
            <div className="flex-grow">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full mt-1" />
            </div>
            <div className="flex-grow">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full mt-1" />
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </CardFooter>
    </Card>
  );
};

export default EditLeadSkeleton;
