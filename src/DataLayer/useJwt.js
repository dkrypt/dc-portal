import _ from 'lodash';
import { useStoreState } from 'easy-peasy';

export default function useJwt(config) {
    const jwt = useStoreState(state => state.jwt);
    return _.merge(config, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
}