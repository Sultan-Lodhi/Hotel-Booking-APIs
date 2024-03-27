import { serve, setup } from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerJSDocs = YAML.load('api-doc.yaml');

export const swaggerServe = serve;
export const swaggerSetup = setup(swaggerJSDocs);
