import os, glob, re

base_dir = 'C:/Portfolio/portfolio_backend/src/modules'

for module_dir in glob.glob(base_dir + '/*'):
    if not os.path.isdir(module_dir): continue
    module_name = os.path.basename(module_dir)
    
    val_file = os.path.join(module_dir, f'{module_name}.validation.ts')
    if os.path.exists(val_file):
        with open(val_file, 'r') as f:
            content = f.read()
        
        # Add ['body'] to z.infer if it's not already there
        def replacer(m):
            if \"['body']\" not in m.group(0):
                return m.group(0) + \"['body']\"
            return m.group(0)
            
        new_content = re.sub(r'z\.infer<typeof [a-zA-Z0-9_]+>', replacer, content)
        
        if new_content != content:
            with open(val_file, 'w') as f:
                f.write(new_content)
            print(f'Updated infer in {val_file}')
