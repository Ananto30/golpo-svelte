<script>
  import { loggedIn, jwt, loginRedirect } from '../store.js'
  const search = window.location.hash.split('?')[1]
  const getUserInfo = () => {
    fetch('https://ggcms.herokuapp.com/auth/google/callback?' + search)  // IMPORTANT: this is not correct url, though it works lol
      .then((res) => res.json())
      .catch((err) => {
        console.log(err)
        window.location.hash = '/login'
      })
      .then((res) => {
        $jwt = res.jwt
        $loggedIn = true

        $loginRedirect
          ? (window.location.hash = $loginRedirect)
          : (window.location.hash = '/profile')
      })
  }
  getUserInfo()
</script>

<div class="p-5 pt-16 md:p-20 md:pt-28 ">
  <h3 class="text-center text-md">Please wait a bit while we are talking with Google 😉</h3>
</div>
