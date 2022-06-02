import { types, flow } from 'mobx-state-tree';
import ApiCall from '../api'

const User = types.model('User', {
  id: types.identifier,
  createdAt: types.string,
  name: types.string,
  avatar: types.string
})

const UsersStore = types.model('UsersStore', {
  users: types.maybe(types.array(User)),
}).actions(self => {
  return {
    load: flow(function* () {
      self.users = yield ApiCall.get('users');
    }),
    afterCreate() {
      self.load()
    }
  }
})

export default UsersStore