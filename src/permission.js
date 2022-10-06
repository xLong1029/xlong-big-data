import router from "./router";
import useStore from "@/store";
import { getPageTitle } from "@/utils";

router.beforeEach(async (to, from, next) => {
    const store = useStore();
    const { useAppStore } = store;
    const { setSysLoading } = useAppStore();

    document.title = getPageTitle(to.meta.title);
    setTimeout(() => setSysLoading(false), 500);
    next();
});