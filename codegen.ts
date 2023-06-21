import { CodegenConfig } from "@graphql-codegen/cli";
import { ClientPresetConfig } from "@graphql-codegen/client-preset";

const ENDPOINT = "https://randorm.deno.dev/";

const config: CodegenConfig = {
  schema: ENDPOINT,
  documents: [
    "pages/**/*.{ts,tsx}",
    "lib/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  generates: {
    "./lib/__codegen__/": {
      preset: "client",
      plugins: [],
      presetConfig: <ClientPresetConfig>{
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
