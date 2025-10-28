import { Card, CardContent } from "~/components/ui/card";
import { Mail, Wallet, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { authClient } from "~/lib/auth-client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";

type UserProfileProps = {
  image: string | null | undefined;
  name: string | undefined;
  email: string | undefined;
  walletAddress?: string | null;
  walletType?: "solana" | "ethereum" | null;
  ethereumNetwork?: string | null;
  isWalletVerified?: boolean;
};

export function UserProfileCard(props: UserProfileProps) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const navigate = useNavigate();
  const [isSignOut, setSignOut] = useState(false);

  return (
    domLoaded && (
      <Card className="flex flex-col gap-6 rounded-xl py-6 relative w-full max-w-screen-sm">
        <CardContent className="px-6">
          <div className="space-y-8">
            {/* Profile Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative flex shrink-0 overflow-hidden rounded-full size-20">
                <img
                  src={props.image ?? ""}
                  alt={props.name ?? ""}
                  referrerPolicy="no-referrer"
                  className="aspect-square size-full"
                />
              </div>
              <div className="flex justify-center flex-col">
                <h5 className="flex items-center justify-center gap-2 text-xl font-semibold">
                  {props.name}
                </h5>
                <div className="flex items-center gap-3 justify-center text-sm">
                  <Mail className="text-muted-foreground size-4" />
                  {props.email}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="bg-muted grid grid-cols-3 divide-x rounded-md border text-center *:py-3">
              <div>
                <h5 className="text-lg font-semibold">0</h5>
                <div className="text-muted-foreground text-sm">Posts</div>
              </div>
              <div>
                <h5 className="text-lg font-semibold">32.2</h5>
                <div className="text-muted-foreground text-sm">
                  Earnings (USDC)
                </div>
              </div>
              <div>
                <h5 className="text-lg font-semibold">12</h5>
                <div className="text-muted-foreground text-sm">Subscribers</div>
              </div>
            </div>

            <Separator />

            {/* Wallet Integration Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Wallet className="size-5 text-primary" />
                <h6 className="font-semibold text-lg">Payment Wallet</h6>
              </div>

              {props.walletAddress ? (
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3 p-4 bg-muted rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">
                          {props.walletType === "solana"
                            ? "Solana"
                            : "Ethereum"}
                        </span>
                        {props.isWalletVerified ? (
                          <Badge variant="default" className="gap-1">
                            <CheckCircle2 className="size-3" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1">
                            <XCircle className="size-3" />
                            Unverified
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground font-mono break-all">
                        {props.walletAddress}
                      </p>
                      {props.walletType === "ethereum" &&
                        props.ethereumNetwork && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Network: {props.ethereumNetwork}
                          </p>
                        )}
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      // Handle wallet change/update
                      toast.info("Wallet management coming soon");
                    }}
                  >
                    Change Wallet
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      Connect your wallet to receive payments from subscribers
                    </p>
                    <WalletMultiButton className="!w-full" />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Supports Solana and Ethereum (L2 networks)
                  </p>
                </div>
              )}
            </div>

            <Separator />

            {/* Logout Button */}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="destructive"
                disabled={isSignOut}
                onClick={() => {
                  setSignOut(true);
                  toast.info("Ending your session…", { duration: Infinity });
                  authClient
                    .signOut()
                    .then(() => {
                      setSignOut(false);
                      toast.dismiss();
                      navigate("/");
                    })
                    .finally(() => {
                      setSignOut(false);
                      toast.dismiss();
                    });
                }}
                className="w-full max-w-xs"
              >
                {isSignOut ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  );
}
