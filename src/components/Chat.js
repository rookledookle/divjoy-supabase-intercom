import { useEffect } from "react";
import Script from "next/script";
import Router from "next/router";
import { usePrevious } from "./../util/util";
import { useAuth } from "./../util/auth";

const config = {
  // Intercom app ID
  intercomAppId: process.env.NEXT_PUBLIC_INTERCOM_APP_ID,
  // Populate with user name and email
  populateUserInfo: true,
  // Reset conversation history on signout (better privacy on shared computers)
  resetOnSignOut: true,
};

function Chat() {
  if (!config.intercomAppId) {
    console.warn("Intercom is disabled because app ID is not specified");
    return null;
  }

  return (
    <>
      <IntercomScript />
      <IntercomUpdater />
    </>
  );
}

function IntercomScript() {
  return (
    <Script
      id="intercom-widget"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function () {
            var w = window;
            var ic = w.Intercom;
            if (typeof ic === 'function') {
              ic('reattach_activator');
              ic('update', w.intercomSettings);
            } else {
              var d = document;
              var i = function () {
                i.c(arguments);
              };
              i.q = [];
              i.c = function (args) {
                i.q.push(args);
              };
              w.Intercom = i;
              var l = function () {
                var s = d.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = "https://widget.intercom.io/widget/${config.intercomAppId}";
                var x = d.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(s, x);
              };
              if (document.readyState === 'complete') {
                l();
              } else if (w.attachEvent) {
                w.attachEvent('onload', l);
              } else {
                w.addEventListener('load', l, false);
              }
            }
          })();

          window.Intercom('boot', {
            api_base: 'https://api-iam.intercom.io',
            app_id: "${config.intercomAppId}",
          });
        `,
      }}
    />
  );
}

function IntercomUpdater() {
  const auth = useAuth();

  // Update Intercom when route changes
  useEffect(() => {
    // Ping Intercom with new data (timestamp) so that it picks up the current page URL
    // See https://www.intercom.com/help/en/articles/170-integrate-intercom-in-a-single-page-app
    function handleRouteChange() {
      window.Intercom("update", {
        last_request_at: parseInt(new Date().getTime() / 1000),
      });
    }

    // Call above handler function on route or hash change
    Router.events.on("routeChangeComplete", handleRouteChange);
    Router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      // Remove handler if this component unmounts
      Router.events.off("routeChangeComplete", handleRouteChange);
      Router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, []);

  // Update Intercom when user data changes
  useEffect(() => {
    if (config.populateUserInfo && auth.user) {
      window.Intercom("update", {
        email: auth.user.email,
        name: auth.user.name,
      });
    }
  }, [auth.user]);

  // Reset Intercom session when user signs out
  const previousUser = usePrevious(auth.user);
  useEffect(() => {
    // We know the user just signed out if we had a `auth.user` and now we don't
    const didSignOut = previousUser && !auth.user;
    if (config.resetOnSignOut && didSignOut) {
      // Shut down Intercom session
      window.Intercom("shutdown");
      // Start a new session
      window.Intercom("boot", {
        api_base: "https://api-iam.intercom.io",
        app_id: config.intercomAppId,
      });
    }
  }, [previousUser, auth.user]);

  return null;
}

export default Chat;
