import { Connection } from "@libp2p/interface-connection";
import { Multiaddr } from "@multiformats/multiaddr";
import { PeerId } from "@libp2p/interface-peer-id";
// eslint-disable-next-line import/namespace
import * as ts from "types/lib/types";
import { SignableENR } from "@chainsafe/discv5";

export interface INetwork {
  events: any; //TODO - Handle events associated with libp2p
  gossip: any; //TODO - Define the class for gossipsub
  reqResp: any; //TODO - Define the class for reqResp
  metadata: any; //TODO - define data metadata
  /** Our network identity */
  peerId: PeerId;
  localMultiaddrs: Multiaddr[];
  getEnr(): Promise<SignableENR | undefined>;
  getConnectionsByPeer(): Map<string, Connection[]>;
  getConnectedPeers(): PeerId[];
  hasSomeConnectedPeer(): boolean;

  /* List of p2p functions supported by Bundler */
  publishUserOp(userOp: ts.UserOp): Promise<void>; //TODO: define UserOp

  //Gossip handler
  subscribeGossipCoreTopics(): void;
  unsubscribeGossipCoreTopics(): void;
  isSubscribedToGossipCoreTopics(): boolean;

  // Service
  start(): Promise<void>;
  stop(): Promise<void>;
  close(): void;

  // Debug
  connectToPeer(peer: PeerId, multiaddr: Multiaddr[]): Promise<void>;
  disconnectPeer(peer: PeerId): Promise<void>;
  getAgentVersion(peerIdStr: string): string;
}