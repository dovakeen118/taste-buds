import React, { useState } from "react";

import { deleteUserSession } from "../../services/requests/deleteUserSession";

export const SignOutButton = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const signOut = async (event) => {
    event.preventDefault();
    try {
      const { responseBody } = await deleteUserSession();
      setShouldRedirect(true);
      return { status: "ok" };
    } catch (err) {
      console.error(`Error in fetch for Sign Out: ${err.message}`);
    }
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <button type="button" className="button" onClick={signOut}>
      Sign Out
    </button>
  );
};
