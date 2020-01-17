import { Success } from '../../core/httpException'

function success(): never {
  throw new Success()
}

export { success }
