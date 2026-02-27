import { Asset } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";

interface Props {
  assets: Asset[];
  onDelete: (id: number) => void;
}

export function AssetTable({ assets, onDelete }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assets.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center py-8 text-muted-foreground"
            >
              No assets found.
            </TableCell>
          </TableRow>
        ) : (
          assets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell className="font-medium">{asset.name}</TableCell>
              <TableCell>{asset.type}</TableCell>
              <TableCell>
                <Badge
                  variant={asset.status === "Active" ? "default" : "secondary"}
                >
                  {asset.status}
                </Badge>
              </TableCell>
              <TableCell>{asset.owner}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/assets/${asset.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                  onClick={() => onDelete(asset.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
