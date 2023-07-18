from libvcs.shortcuts import create_repo
repo_url = input()

# Case 1
r = create_repo(url=repo_url, vcs='hg', repo_dir='/tmp/test_hg_repo')

# Case 2
r = create_repo(repo_url, 'hg', repo_dir='/tmp/test_hg_repo')
