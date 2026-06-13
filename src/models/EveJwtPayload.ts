type EveJwtPayload = {
  name: string;
  sub: string;
  scp: string | string[];
  iss: string;
  aud: string | string[];
  exp: number;
};

export default EveJwtPayload;
