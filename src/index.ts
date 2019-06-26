import * as app from './app'
import * as S from './services/client'

S.configFields(null, null, null).then(fields => {

})

app.listen(3000, () => console.log('listening'))
