import json from "@/__backengine__/metadata.json";
import Hook from "./Hook/Hook";

// TODO: move to generated types file?
export type Metadata = {
  name: string;
  location: string;
  type: string;
  entityType: "TABLE" | "JOIN_TABLE" | "VIEW";
  entityName: string;
  usage: string;
};

export default function Hooks() {
  const metadata = json as Metadata[];

  return (
    <div className="text-foreground">
      <h2 className="text-lg font-bold mb-6">React Hooks </h2>
      <div className="w-full justify-center space-y-6">
        {metadata.map((hookMetadata) => (
          <Hook key={hookMetadata.name} hookMetadata={hookMetadata} />
        ))}
      </div>
    </div>
  );
}
