import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { NavigationState, useNavigation } from "@react-navigation/native";

import { httpClientFactory } from "../../adapters/AxiosHttpClientAdapter";

import { UnsplashGateway } from "../../gateways/UnsplashGateway";

const gateway = new UnsplashGateway(httpClientFactory());

export default function HomeScreen() {
  const navigation = useNavigation();

  const [imageList, setImageList] = useState<IImageList[]>([]);

  const handleGetImages = useCallback(async () => {
    const response = await gateway.index();

    setImageList(response.body);
  }, []);

  useEffect(() => {
    handleGetImages();
  }, [handleGetImages]);

  return (
    <>
      <StatusBar />

      <FlatList
        data={imageList}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => {}}>
              <CardComponent
                title="SIT AMET"
                subtitle="LOREM IPSUM DOLOR"
                image={item.urls.full}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.container}
      />
    </>
  );
}

function CardComponent({ title, subtitle, image }: any) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  card: {
    position: "relative",
    flex: 1,
    margin: 10,
    padding: 0,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  textContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  title: {
    alignSelf: "flex-start",
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#3f817b",
    borderRadius: 8,
    textAlign: "left",
  },
  subtitle: {
    color: "#fff",
    fontSize: 10,
  },
});

interface IImageList {
  id: string;
  slug: string;
  alternative_slugs: {
    en: string;
    es: string;
    ja: string;
    fr: string;
    it: string;
    ko: string;
    de: string;
    pt: string;
  };
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: null;
  alt_description: string;
  breadcrumbs: [];
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  likes: number;
  liked_by_user: boolean;
  current_user_collections: null;
  sponsorship: null;
  topic_submissions: null;
  asset_type: string;
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: null;
    portfolio_url: null;
    bio: string;
    location: string;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
      following: string;
      followers: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    total_promoted_photos: number;
    total_illustrations: number;
    total_promoted_illustrations: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: {
      instagram_username: string;
      portfolio_url: null;
      twitter_username: null;
      paypal_email: null;
    };
  };
}
