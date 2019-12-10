import { Repository } from './Repository';

export default {
    getAllGateways() {
        return Repository.get('/gates');
    }
}
