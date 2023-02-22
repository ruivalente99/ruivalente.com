import { getExample, postExample } from 'services/webclient';
import { User } from 'types/User';

describe( 'getExample', () => {
    it( 'returns example data', async() => {
        const data = await getExample()
        expect( data ).toBeDefined()
    } )
} )

const data: User = {
    username: "bob.smith",
    accessToken: "qwerty456",
    email: "bob.smith@example.com",
    tenant: "acme",
    operator: "user",
    isVerified: true,
    groups: ["users"]
}
describe( 'postExample', () => {
    it( 'saves user data', async() => {
        const response = await postExample( data )
        expect( response ).toBeDefined()
    } )
} )


