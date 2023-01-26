import { program } from "commander";
import fetch from "node-fetch";

const fetchFeatures = async (host: string, key: string) => {
  const response = await fetch(`${host}/api/v1/features`, {
    headers: {
      Authorization: `Basic ${btoa(key + ":")}`,
    },
  });
  const features = await response.json();
  return features;
};

const parseFeatures = (features: any) => {
  // TODO return type definition information for features
  console.log("parsing features", features);
};

const generateTypeDefinitions = async (
  language: string,
  featureTypes: any
) => {};

program
  .name("gbctl")
  .description("GrowthBook CLI tool")
  .command("gen-types")
  .requiredOption("--host <host>")
  .requiredOption("--key <key>")
  .requiredOption("--language <language>")
  .action(async (options) => {
    const { host, key, language } = options;

    // fetch features
    const features = await fetchFeatures(host, key);

    // parse schema
    const featureTypes = parseFeatures(features);

    // generate types
    await generateTypeDefinitions(language, featureTypes);
  });

program.parse();
