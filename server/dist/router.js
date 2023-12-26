import { router } from "./trpc.js";
import userRouter from "./employees/router.js";
import departmentRouter from "./departments/router.js";
const appRouter = router({
    employee: userRouter,
    department: departmentRouter,
});
export default appRouter;
