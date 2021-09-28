import { useStoreState } from "easy-peasy";
import _ from "lodash";

const useDataStore = (key) => {
    const dataStore = useStoreState((state)=>state.dataStore);
    let found = _.at(dataStore, key);
    if (!found || found.length === 0) {
        return null;
    }
    return found[0];
};