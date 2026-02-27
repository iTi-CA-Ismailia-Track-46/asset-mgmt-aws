import { getAsset } from "@/lib/api";
import { FileUploader } from "@/components/FileUploader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function AssetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const asset = await getAsset(parseInt(id));

  // If your backend returns files inside the asset object:
  // const files = asset.files || [];
  // If not, you might need a separate getFiles(id) call.
  // Assuming basic implementation for now:
  const files = asset.files || [];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <Link
        href="/assets"
        className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Assets
      </Link>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Asset Details Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-2xl">{asset.name}</CardTitle>
              <Badge
                variant={asset.status === "Active" ? "default" : "secondary"}
              >
                {asset.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Type
              </div>
              <div>{asset.type}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Owner
              </div>
              <div>{asset.owner}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Asset ID
              </div>
              <div className="font-mono text-xs">{asset.id}</div>
            </div>
          </CardContent>
        </Card>

        {/* File Upload Card */}
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUploader assetId={asset.id} initialFiles={files} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
