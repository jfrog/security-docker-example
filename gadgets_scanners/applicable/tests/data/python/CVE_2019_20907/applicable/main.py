import os
import tarfile
import tarfile as _

# _4 :: test for user defiende value 
#       should return evidence
Unknown = input()
tar = tarfile.open(Unknown)

# _5 :: test for alias
#       should return evidence
tar = _.open(Unknown)

# _8 :: test for call order change (Known, Unknown)
#       should return evidence
tar = tarfile.open(mode="r", name=Unknown)

# _9 :: test for call order change (Unknown, Unknown)
#       should return evidence
tar = tarfile.open(mode=Unknown, name=Unknown)