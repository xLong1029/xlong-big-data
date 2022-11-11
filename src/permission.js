import router from "./router";
import useStore from "@/store";
import { getPageTitle, clearTimer } from "@/utils";

let timer = null;

router.beforeEach(async (to, from, next) => {
    const store = useStore();
    const { useAppStore } = store;
    const { setSysLoading } = useAppStore();

    document.title = getPageTitle(to.meta.title);

    clearTimer([timer]);
    timer = setTimeout(() => setSysLoading(false), 500);

    next();
});