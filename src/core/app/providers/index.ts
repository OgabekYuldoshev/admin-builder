import compose from "compose-function";

import { withMantine } from "./with-mantine";
import { withQuery } from "./with-query";

export const withProviders = compose(withMantine, withQuery);
