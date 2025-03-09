import subprocess
import socket
import ipaddress
import concurrent.futures

def ping_host(ip):
    try:
        result = subprocess.run(
            ['ping', '-c', '2', '-W', '1', str(ip)],
            stdout=subprocess.DEVNULL, 
            stderr=subprocess.DEVNULL,
            timeout=2
        )
        return result.returncode == 0
    except:
        return False

def get_local_network():
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(('8.8.8.8', 80))
            local_ip = s.getsockname()[0]
        
        return ipaddress.IPv4Network(f"{local_ip}/24", strict=False)
    except Exception as e:
        print(f"Error detecting network: {e}")
        return None

def scan_network(network):
    active_hosts = []
    
    print(f"Scanning network: {network}")
    print(f"Network Address: {network.network_address}")
    print(f"Broadcast Address: {network.broadcast_address}")
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=50) as executor:
        # Create futures for all hosts in the network
        futures = {
            executor.submit(ping_host, ip): ip 
            for ip in network.hosts()
        }
        
        # Check results as they complete
        for future in concurrent.futures.as_completed(futures):
            ip = futures[future]
            if future.result():
                try:
                    # Try to resolve hostname
                    hostname = socket.gethostbyaddr(str(ip))[0]
                except:
                    hostname = "Unknown"
                
                active_hosts.append((str(ip), hostname))
                print(f"Active Host Found: {ip} (Hostname: {hostname})")
    
    return active_hosts

def main():
    network = get_local_network()
    
    if not network:
        print("Could not determine network. Exiting.")
        return
    
    active_hosts = scan_network(network)
    
    print("\n--- Network Scan Summary ---")
    print(f"Total Active Hosts: {len(active_hosts)}")
    
    for ip, hostname in active_hosts:
        print(f"IP: {ip}, Hostname: {hostname}")

if __name__ == "__main__":
    main()