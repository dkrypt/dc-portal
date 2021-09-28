import { action } from 'easy-peasy';
import _ from 'lodash';

const StoreModel = {
    user: {
        fullName: '',
        country: '',
        email: '',
        locality: '',
        organization: '',
        organizationalUnit: '',
        provice: '',
        postalCode: '',
        streetAddress: '',
        userId: '',
        role: '',
        scope: []
    },
    setUser: action((state, userEntity) => {
        state.user = _.omit(
            userEntity,
            ['raw', 'license', 'env', 'dns']
        );
    }),
    jwt: '',
    setJwt: action((state, token) => {
       state.jwt = token; 
    }),
    parentDSKey: '88e7f3d2-1dfb-496f-98bb-77351e023078',
    setParentDSKey: action((state, key) => {
        if (key)
        state.parentDSKey = key;
    }),
    dataStore: {
        global: {
            dataset: {},
            setDataset: action((state, dataset) => {
                state.dataStore.global.dataset = dataset;
            })
        }
    }
};

export default StoreModel;