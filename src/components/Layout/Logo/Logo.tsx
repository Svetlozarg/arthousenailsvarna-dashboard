import { Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Stack height="5rem" justifyContent="center" alignItems="center" p={2}>
      <Link href="/">
        <Image
          src="https://ik.imagekit.io/obelussoft/arthouse_logo_clean_szOaGb_aq.png?updatedAt=1707047013555"
          width={200}
          height={70}
          alt="logo"
          priority
        />
      </Link>
    </Stack>
  );
};

export default Logo;
