from scapy.all import *

google_ip = socket.gethostbyname('google.com')
print(f"Google IP Address: {google_ip}")

def google_packet_handler(packet):
    packet.show()
    return True

sniff(
    filter=f"host {google_ip}",
    count=1,
    prn=google_packet_handler
)