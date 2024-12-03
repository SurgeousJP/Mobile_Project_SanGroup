import { colors } from "@/constants/colors";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import Searchbar from "@/components/Inputs/Searchbar/Searchbar";
import { Link } from "expo-router";
import Add from "@/assets/icons/system-icons-svg/Add.svg";
import TokenRow from "@/components/Items/Token/TokenRow";
import { AuthContext } from "@/contexts/AuthProvider";
import { useQuery } from "@apollo/client";
import { GET_TOKENS } from "@/queries/token";
import NotFound from "@/components/Displays/SearchResult/NotFound";

export default function TokenScreen() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading((loading) => false);
  }, []);

  const { address } = useContext(AuthContext);

  const {
    loading: isTokenLoading,
    error,
    data: tokenQueryData,
  } = useQuery(GET_TOKENS, {
    variables: { address: address },
    skip: !address,
  });

  const tokens = tokenQueryData?.tokens;
  console.log("Tokens: ", tokens);

  useEffect(() => {
    console.log("Tokens: ", tokens);
    console.log("Query status: ", isTokenLoading);
    console.log("Error: ", error?.message);
  }, [loading, isTokenLoading, error, tokens]);

  if (loading || isTokenLoading) {
    return (
      <View className="flex flex-col flex-1 items-center justify-center my-auto bg-background ">
        <ActivityIndicator size="large" color={colors.primary} />
        <Text className="font-readexRegular text-primary text-md">Loading</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 pb-2 bg-background">
      <View className="bg-surface mb-4">
        <View className="flex flex-row justify-between items-center bg-surface px-4 space-x-2 border-b-[0.5px] border-border py-2 pb-3">
          <Searchbar placeholder={"Search token"} />
          <Link href={"/token"}>
            <Add width={24} height={24} stroke={colors.secondary} />
          </Link>
        </View>
      </View>
      {tokens !== undefined && tokens.length > 0 ? (
        <FlatList
          style={{ paddingHorizontal: 16 }}
          contentContainerStyle={{
            borderRadius: 8,
            overflow: "hidden",
            borderColor: colors.border,
            borderWidth: 1,
          }}
          data={tokens}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => {
            return (
              <TokenRow
                name={"N/A"}
                symbol={"N/A"}
                totalSupply={item.item.maxTotalSupply}
                address={item.item.address}
                initialSupply={item.item.initialSupply}
              />
            );
          }}
        />
      ) : (
        <NotFound heading={"No tokens found"} detail={"If this is your first time, please try creating a new token, otherwise please readjusting the query."} />
      )}
    </View>
  );
}
